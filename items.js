// array untuk menyimpan data item, dan variabel id untuk increment id
let items = [];
let id = 0;

// function untuk menambah data item, terdiri dari nama dan jumlah dan harga
function addItem(Name, Price, Qty) {
    id++;
    const item = { id: id, name: Name, price: Price, qty: Qty};
    items.push(item);
    return item;
}

// function untuk mendapatkan semua item 
function getItems() {
    return items;
}

// function untuk mendapatkan item berdasarkan id barang
function getItemById(itemId) {
    return items.find(item => item.id === itemId);
}

// function untuk update data berdasarkan id barang
function updateItemById(itemId, name, price, qty) {
    const index = items.findIndex(item => item.id === itemId);
    if(index !== -1) {
        items[index] = {
            id: itemId,
            name: name,
            price: price,
            qty: qty
        };
        return items[index];
    }
    return null;
}

// function untuk hapus data berdasarkan id barang
function deleteItemById(itemId) {
    const index = items.findIndex(item => item.id === itemId);
    if(index !== -1) {
        return items.splice(index, 1)[0];
    }
    return null;
}

// export semua function sebagai object

module.exports = { addItem, getItems, getItemById, updateItemById, deleteItemById };