const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { query } = require('express');
const { options } = require('joi');

class ProductsService {

  constructor(){
    //this.products = [];
    //this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where:{}
    } //paginacion con query limit&&offset and other paramethers
    const { limit, offset } = query;
    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    const { price } = query;
    if (price) {
    options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const rta = await models.Product.findAll(options);
    return rta;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if(!product) {
    throw boom.notFound("Product not found");
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = product.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

}

module.exports = ProductsService;
