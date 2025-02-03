
// Item CRUD operations

app.post("/item", async (req, res) => {
    const { name, price } = req.body;
  
    if (!name || !price) {
      return res.status(401).send({ message: "Both name and price are required", success: false });
    }
  
    try {
      const newItem = await itemModel.create({ name, price });
      return res.status(201).send({ message: "Item created", success: true, data: newItem });
    } catch (error) {
      console.log("Error in post item:", error.message);
      return res.status(500).send({ message: "Server error", success: false });
    }
  });
  
  app.get("/item", async (req, res) => {
    try {
      const allItems = await itemModel.find({});
      return res.status(200).send({ message: "All items", success: true, data: allItems });
    } catch (error) {
      console.log("Error in fetching items:", error.message);
      return res.status(500).send({ message: "Server error", success: false });
    }
  });
  
  app.get("/item/:id", async (req, res) => {
    try {
      const item = await itemModel.findById(req.params.id);
      return res.status(200).send({ message: "Item", success: true, data: item });
    } catch (error) {
      console.log("Error in fetch item:", error.message);
      return res.status(500).send({ message: "Server error", success: false });
    }
  });
  
  app.put("/item/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const itemExists = await itemModel.findById(id);
      if (!itemExists) {
        return res.status(404).send({ message: "Item not found", success: false });
      }
      await itemModel.findByIdAndUpdate(id, req.body);
      return res.status(200).send({ message: "Item updated", success: true });
    } catch (error) {
      console.log("Error in put item:", error.message);
      return res.status(500).send({ message: "Server error", success: false });
    }
  });
  
  app.delete("/item/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const itemExists = await itemModel.findById(id);
      if (!itemExists) {
        return res.status(404).send({ message: "Item not found", success: false });
      }
      await itemModel.findByIdAndDelete(id);
      return res.status(200).send({ message: "Item deleted", success: true });
    } catch (error) {
      console.log("error in delete item:", error.message);
      return res.status(500).send({ message: "Server error", success: false });
    }
  });
  
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    connectDB();
    console.log(`Listening on http://localhost:${PORT}`);
  });
