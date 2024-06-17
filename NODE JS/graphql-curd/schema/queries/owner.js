const { Owner } = require('../../models');

exports.OwnerQuery = async (parent, args) => {
    try {
        const data = await Owner.findAll();
        return data;
    } catch (error) {
        console.error('Error fetching Ownerlist:', error);
        return [];
    }
};


exports.OwnerByIdQuery = async (parent, args) => {
    const { id } = args;
    try {
        const data = await Owner.findByPk(id);
        return data;
    } catch (error) {
        console.error('Error fetching owner by ID:', error);
        return null;
    }
};

exports.ownerUpdate = async (input) => {
    const { id, name } = input;
    try{
        const singleOwner = await Owner.findByPk(id);
        if (!singleOwner) {
            throw new Error('Website not found');
        }
        await singleOwner.update({ name });
        return singleOwner;
    }catch{
        console.error('Error updating singleOwner by ID:', error);
        return null;
    }
};



