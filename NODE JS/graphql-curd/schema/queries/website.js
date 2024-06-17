//queries.js

const { Website } = require('../../models');

exports.WebsiteQuery = async (parent, args) => {
    try {
        const data = await Website.findAll();
        return data;
    } catch (error) {
        console.error('Error fetching websitelist:', error);
        return [];
    }
};



exports.WebsiteByIdQuery = async (parent, args) => {
    const { id } = args;
    try {
        const data = await Website.findByPk(id);
        return data;
    } catch (error) {
        console.error('Error fetching website by ID:', error);
        return null;
    }
};

exports.createWebsite = async (parent,args) => {
    try {
        if (!args.input) {
            throw new Error('Input argument is missing.');
        }

        const { name,ownerId } = args.input;
        const newWebsite = await Website.create({ name,ownerId });
        return newWebsite;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

exports.WebsiteByUpdateQuery = async (input) => {
    const { id, name,ownerId } = input;
    try{
        const singlewebsite = await Website.findByPk(id);
        if (!singlewebsite) {
            throw new Error('Website not found');
        }
        await singlewebsite.update({ name,ownerId });
        return singlewebsite;
    }catch{
        console.error('Error updating website by ID:', error);
        return null;
    }
};

exports.deleteWebsite = async (parent, args) => {
    const { id } = args;
    try {
        const data = await Website.findByPk(id);
        if (!data) {
            throw new Error(`Website with ID ${id} not found`);
        }
        await data.destroy();
        return data; // Return the deleted website
    } catch (error) {
        console.error('Error deleting website by ID:', error);
        throw error; // Rethrow the error to be caught by GraphQL
    }
};


