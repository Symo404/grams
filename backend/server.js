require('dotenv').config(); // Loads environment variables from .env file
const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const db = require('./db');
const pool = require('./db');
const path = require('path');
const upload = require('./uploadConfig');


const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("FATAL ERROR: GEMINI_API_KEY is not defined in your .env file.");
  // Exit the process if the key is missing, as the app cannot function without it.
  process.exit(1); 
}


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


// Create an instance of the express app
const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 by default

// --- MIDDLEWARE ---
// This allows our server to accept JSON data in the body of requests
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ message: 'Error: No File Selected!' });
      } else {
        // If upload is successful, send back the path to the file
        res.status(200).json({
          message: 'File uploaded successfully!',
          filePath: `/uploads/${req.file.filename}`
        });
      }
    }
  });
});

// --- API ENDPOINTS (ROUTES) ---
// Define a simple test route
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Grams Coffee backend!" });
});

app.get('/api/menu-drinks', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM menu_drinks');
    res.json(rows); // Send the results back to the client
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


app.get('/api/blogs', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM blogs');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/blogs', async (req, res) => {
  const { id, title, tagline, category, image, content } = req.body;
  
  if (!id || !title) {
    return res.status(400).json({ message: 'ID and Title are required fields.' });
  }

  // --- FIX: Default content to an empty array if it's not provided ---
  const finalContent = content || [];

  try {
    const newPost = await db.query(
      "INSERT INTO blogs (id, title, tagline, category, image, content) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, title, tagline, category, image, finalContent] // Use the safer finalContent variable
    );
    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error("Database INSERT error:", err.message);
    res.status(500).json({ message: 'Server error during creation.' });
  }
});


app.post('/api/products', async (req, res) => {
  const { name, price, category, image, tags, availability, stock_quantity, details, shipping_note, gallery_images, colors, more_details } = req.body;
  try {
    const newProduct = await db.query(
      "INSERT INTO products (name, price, category, image, tags, availability, stock_quantity, details, shipping_note, gallery_images, colors, more_details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [name, price, category, image, tags, availability, stock_quantity, details, shipping_note, gallery_images, colors, more_details]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (err) { /* ... error handling ... */ }
});

// PUT (Update) an existing product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image, tags, availability, stock_quantity, details, shipping_note, gallery_images, colors, more_details } = req.body;
  try {
    const updatedProduct = await db.query(
      "UPDATE products SET name = $1, price = $2, category = $3, image = $4, tags = $5, availability = $6, stock_quantity = $7, details = $8, shipping_note = $9, gallery_images = $10, colors = $11, more_details = $12 WHERE id = $13 RETURNING *",
      [name, price, category, image, tags, availability, stock_quantity, details, shipping_note, gallery_images, colors, more_details, id]
    );}catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteOp = await db.query("DELETE FROM products WHERE id = $1", [id]);
    if (deleteOp.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/products/update-stock', async (req, res) => {
  const { cartItems } = req.body;
  console.log('--- Received Stock Update Request ---', cartItems);

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Invalid or empty cart items data.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log('Stock update transaction started.');

    for (const item of cartItems) {
      const quantityToSubtract = parseInt(item.quantity, 10);
      const productId = parseInt(item.id, 10);

      if (isNaN(quantityToSubtract) || isNaN(productId)) {
        throw new Error(`Invalid data in stock update: id=${item.id}, quantity=${item.quantity}`);
      }
      
      console.log(`Updating stock for product ID ${productId}, subtracting ${quantityToSubtract}`);
      const result = await client.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2 AND stock_quantity >= $1',
        [quantityToSubtract, productId]
      );

      if (result.rowCount === 0) {
        const checkStock = await client.query('SELECT stock_quantity FROM products WHERE id = $1', [productId]);
        const reason = checkStock.rows.length === 0 ? 'Product not found.' : `Insufficient stock.`;
        throw new Error(`Stock update failed for product ID ${productId}. Reason: ${reason}`);
      }
    }

    await client.query('COMMIT');
    console.log('Stock update transaction committed.');
    res.status(200).json({ message: 'Stock updated successfully.' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('--- Stock Update Transaction FAILED ---');
    console.error('Error:', err.message);
    res.status(500).json({ message: err.message || 'Failed to update stock.' });
  } finally {
    client.release();
    console.log('Stock update client released.');
  }
});

app.get('/api/analytics/dashboard', async (req, res) => {
    try {
        const [totalProductsRes, menuItemsRes, inStockRes, recentProductsRes, lowStockProductsRes, totalRevenueRes] = await Promise.all([
            pool.query('SELECT COUNT(*) FROM products'),
            pool.query('SELECT COUNT(*) FROM menu_drinks'),
            pool.query('SELECT COUNT(*) FROM products WHERE availability = TRUE AND stock_quantity > 0'),
            pool.query('SELECT id, name, price, image FROM products ORDER BY created_at DESC LIMIT 3'),
            pool.query('SELECT id, name, stock_quantity, image FROM products WHERE stock_quantity > 0 AND stock_quantity <= 5 ORDER BY stock_quantity ASC LIMIT 5'),
            pool.query('SELECT SUM(total_price) as total_revenue FROM orders')
        ]);
        const analytics = {
            totalProducts: totalProductsRes.rows[0].count,
            totalMenuItems: menuItemsRes.rows[0].count,
            productsInStock: inStockRes.rows[0].count,
            recentProducts: recentProductsRes.rows,
            lowStockProducts: lowStockProductsRes.rows,
            totalRevenue: totalRevenueRes.rows[0].total_revenue || 0
        };
        res.json(analytics);
    } catch (err) {
        console.error('Failed to fetch dashboard analytics:', err.message);
        res.status(500).send('Server Error');
    }
});

// --- THIS IS THE FULLY IMPLEMENTED GET ORDERS ENDPOINT ---
app.get('/api/orders', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT
                o.id as order_id,
                o.customer_name,
                o.total_price,
                o.created_at,
                json_agg(
                    json_build_object(
                        'product_id', p.id,
                        'name', p.name,
                        'quantity', oi.quantity,
                        'price_per_item', oi.price_per_item
                    )
                ) as items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            GROUP BY o.id
            ORDER BY o.created_at DESC;
        `);
        res.json(rows);
    } catch (err) {
        console.error("GET /api/orders error:", err.message);
        res.status(500).send('Server error');
    }
});

app.post('/api/orders', async (req, res) => {
  // Because app.use(express.json()) ran first, req.body will now be a valid object.
  const { customerInfo, orderItems, totals } = req.body;
  
  if (!customerInfo || !orderItems || !totals) {
    return res.status(400).json({ message: 'Missing order data.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const orderResult = await client.query(
      'INSERT INTO orders (customer_name, customer_phone, shipping_address, subtotal, shipping_cost, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [customerInfo.fullName, customerInfo.phone, `${customerInfo.address}, ${customerInfo.city}`, totals.subtotal, totals.shipping, totals.total]
    );
    const newOrderId = orderResult.rows[0].id;

    const productsInOrder = orderItems.filter(item => typeof item.id === 'number');
    if (productsInOrder.length > 0) {
      const itemPromises = productsInOrder.map(item => {
        return client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price_per_item) VALUES ($1, $2, $3, $4)',
          [newOrderId, item.id, item.quantity, item.price]
        );
      });
      await Promise.all(itemPromises);
    }
    
    await client.query('COMMIT');
    res.status(201).json({ message: 'Order created successfully', orderId: newOrderId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Order creation failed:', err.message);
    res.status(500).json({ message: 'Failed to create order.' });
  } finally {
    client.release();
  }
});


app.get('/api/products/:id', async (req, res) => {
  // --- FIX: Convert the id from a string to an integer ---
  const id = parseInt(req.params.id);

  // Add a check to ensure the ID is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/menu-drinks/:id', async (req, res) => {
  const { id } = req.params; // The ID is a string like 'md01'
  
  // Basic validation on the server side
  if (!id) {
    return res.status(400).json({ message: 'Drink ID is required.' });
  }

  try {
    // The query remains the same, but we will ensure our DB connection is solid.
    // The previous version of this query was correct. A failure here points to
    // a connection or data issue.
    const { rows } = await db.query('SELECT * FROM menu_drinks WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      // This is the line that's likely being triggered.
      console.log(`DATABASE_QUERY: No menu_drink found for id = '${id}'`); // <-- SERVER-SIDE DEBUG LOG
      return res.status(404).json({ message: 'Menu drink not found in database' });
    }
    
    console.log(`DATABASE_QUERY: Successfully found menu_drink for id = '${id}'`); // <-- SERVER-SIDE DEBUG LOG
    res.json(rows[0]); // Return the single drink object
  } catch (err) {
    console.error("API Error fetching single menu drink:", err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/menu-drinks', async (req, res) => {
  // 1. Destructure using the EXACT camelCase keys the frontend form sends.
  const { 
    id, name, category, themeColor, tags, tagline, subheading, 
    description, options, supplements, mainImage, menuIcon, 
    colors, more_details, details, shipping_note, gallery_images 
  } = req.body;
  
  // 2. Basic validation
  if (!id || !name || !category) {
    return res.status(400).json({ message: 'ID, Name, and Category are required.' });
  }

  // 3. The SQL query lists the EXACT snake_case column names from your database.
  const queryText = `
    INSERT INTO menu_drinks (
      id, name, category, theme_color, tags, tagline, subheading, description, 
      options, supplements, main_image, menu_icon, colors, more_details, 
      details, shipping_note, gallery_images
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
    RETURNING *
  `;

  // 4. The parameters array provides the camelCase variables in the EXACT same order as the columns in the query.
  const queryParams = [
    id, name, category, themeColor, tags, tagline, subheading, description, 
    options, supplements, mainImage, menuIcon, JSON.stringify(colors || []), 
    JSON.stringify(more_details || []), details, shipping_note, gallery_images
  ];

  try {
    const newDrink = await pool.query(queryText, queryParams);
    res.status(201).json(newDrink.rows[0]);
  } catch (err) {
    // This will print the specific PostgreSQL error to your terminal
    console.error("Database INSERT error:", err.message);
    res.status(500).json({ message: 'Server error during creation.' });
  }
});


// POST (Create) a new menu drink
app.post('/api/menu-drinks', async (req, res) => {
  // Destructure ALL possible fields the form can send
  const { 
    id, name, category, themeColor, tags, tagline, subheading, 
    description, options, supplements, mainImage, menuIcon, 
    colors, more_details, details, shipping_note, gallery_images 
  } = req.body;
  
  if (!id || !name || !category) {
    return res.status(400).json({ message: 'ID, Name, and Category are required.' });
  }

  try {
    const newDrink = await db.query(
      `INSERT INTO menu_drinks (
        id, name, category, theme_color, tags, tagline, subheading, description, 
        options, supplements, main_image, menu_icon, colors, more_details, 
        details, shipping_note, gallery_images
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [
        id, name, category, themeColor, tags, tagline, subheading, description, 
        options, supplements, mainImage, menuIcon, JSON.stringify(colors || []), 
        JSON.stringify(more_details || []), details, shipping_note, gallery_images
      ]
    );
    res.status(201).json(newDrink.rows[0]);
  } catch (err) {
    console.error("Database INSERT error:", err.message);
    res.status(500).json({ message: 'Server error during creation.' });
  }
});

// PUT (Update) an existing menu drink
app.put('/api/menu-drinks/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    name, category, themeColor, tags, tagline, subheading, 
    description, options, supplements, mainImage, menuIcon, 
    colors, more_details, details, shipping_note, gallery_images 
  } = req.body;

  try {
    const updatedDrink = await db.query(
      `UPDATE menu_drinks SET 
        name = $1, category = $2, theme_color = $3, tags = $4, tagline = $5, 
        subheading = $6, description = $7, options = $8, supplements = $9, 
        main_image = $10, menu_icon = $11, colors = $12, more_details = $13, 
        details = $14, shipping_note = $15, gallery_images = $16 
      WHERE id = $17 RETURNING *`,
      [
        name, category, themeColor, tags, tagline, subheading, description, 
        options, supplements, mainImage, menuIcon, JSON.stringify(colors || []), 
        JSON.stringify(more_details || []), details, shipping_note, gallery_images, 
        id
      ]
    );
    if (updatedDrink.rows.length === 0) {
      return res.status(404).json({ message: "Menu drink not found" });
    }
    res.json(updatedDrink.rows[0]);
  } catch (err) {
    console.error("Database UPDATE error:", err.message);
    res.status(500).json({ message: 'Server error during update.' });
  }
});

// POST (Create) a new blog post
app.post('/api/blogs', async (req, res) => {
  const { id, title, tagline, category, image, content } = req.body;
  if (!id || !title) { return res.status(400).json({ message: 'ID and Title are required.' }); }
  
  // Safety check: ensure `content` is an array if it's missing.
  const finalContent = content || [];

  try {
    const newPost = await db.query(
      "INSERT INTO blogs (id, title, tagline, category, image, content) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, title, tagline, category, image, finalContent] // Use the safe variable
    );
    res.status(201).json(newPost.rows[0]);
  } catch (err) { /* ... error handling ... */ }
});

// PUT (Update) an existing blog post
app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, tagline, category, image, content } = req.body;
  
  // Safety check: ensure `content` is an array if it's missing.
  const finalContent = content || [];

  try {
    const updatedPost = await db.query(
      "UPDATE blogs SET title = $1, tagline = $2, category = $3, image = $4, content = $5 WHERE id = $6 RETURNING *",
      [title, tagline, category, image, finalContent, id] // Use the safe variable
    );
  } catch (err) {
    console.error("Database UPDATE error:", err.message);
    res.status(500).json({ message: 'Server error during update.' });
  }
});


// DELETE a blog post
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteOp = await db.query("DELETE FROM blogs WHERE id = $1", [id]);
    if (deleteOp.rowCount === 0) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    console.error("API Error fetching categories:", err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/ai/suggest-drink', async (req, res) => {
  const { mood, menuDrinks } = req.body;

  if (!mood || !menuDrinks) {
    return res.status(400).json({ message: 'Mood and menu drinks are required.' });
  }

  const prompt = `You are a friendly and creative barista at a specialty coffee shop called Grams. A customer is looking for a drink suggestion based on their mood.
  Their mood is: "${mood}".

  Here is the list of available drinks:
  ${JSON.stringify(menuDrinks, null, 2)}

  Based on their mood and the available drinks, suggest the single best drink for them.
  
  Your response MUST be in a valid JSON format, with no other text before or after it. The JSON object should have two keys:
  1. "drinkId": The exact 'id' of the drink you are recommending (e.g., "md01").
  2. "explanation": A short, friendly, and creative explanation (2-3 sentences) for why this drink is the perfect match for their mood.
  
  Example response format:
  {
    "drinkId": "md02",
    "explanation": "Since you're feeling energetic and creative, the Matcha Latte is a perfect choice! Its vibrant green tea provides a smooth, focused energy boost without the jitters, helping you channel that creative spark."
  }`;

  // --- DEBUGGING: Log the exact prompt being sent to the AI ---
  console.log("--- Sending Prompt to Gemini ---");
  console.log(prompt);
  console.log("---------------------------------");

  try {
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    
    console.log("--- Received Response from Gemini ---");
    console.log(responseText);
    console.log("------------------------------------");

    const suggestion = JSON.parse(responseText);
    res.json(suggestion);

  } catch (error) {
    console.error("AI suggestion failed:", error);
    res.status(500).json({ message: "The AI barista is thinking too hard... Please try again." });
  }
});

// --- START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});