import Product from "../models/Product.js";

export async function insertProduct(req,res){
  try{
    const product = req.body;

    await Product.create(product);

    return res.status(201).json({
      msg:"Product inserted successfully"
    })
  }catch(err){
    return res.status(400).json({
      msg:"Error while inserting product"
    })
  }
}

export async function getAllProducts(req,res){
  try{
    let { gender , color , size} = JSON.parse(req.query.filters);
    let price = JSON.parse(req.query.price);

    // handle product filtering

    if(gender.length === 0)
    {
      gender = ["male","female"]; 
    }
    if(color.length === 0)
    {
      color = ["black","white","red","blue","yellow","green"];
    }
    if(size.length === 0)
    {
      size = ["S","M","L","XL"];
    }

    // handle pagination

    let page = Number(req.query.page);
    let productsPerPage = 9;
    let skip = productsPerPage * (page-1);
    let total = await Product.countDocuments();

    let products = await Product.find().where("gender")
      .in(gender)
      .where("color")
      .in(color)
      .where("size")
      .in(size)
      .where("price")
      .gte(price[0])
      .where("price")
      .lte(price[1])
      .skip(skip)
      .limit(productsPerPage);

    let pages = Math.ceil(total / productsPerPage);

    return res.status(200).json({
      products,
      pages
    });
  }catch(err){
    return res.status(400).json({
      msg:"Error while fetching products"
    })
  }
}