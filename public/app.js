document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('item-form');
    const itemsList = document.getElementById('list-items');
    const cancelEditButton = document.getElementById('cancel-edit');
    let itemId;
    let editMode = false;

    const fetchItems = async () => {
        try {
            const response = await fetch('/items');
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const items = await response.json();
            itemsList.innerHTML = "";
            items.forEach(item => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>
                    <button onClick="editItem(${item.id})">Edit</button>
                    <button onClick="deleteItem(${item.id})">Hapus</button>
                </td>
                `;
                itemsList.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching items:', error);
            // Anda bisa menambahkan kode di sini untuk menangani kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
        }
    }

    window.editItem = async (id) => {
        try {
            const response = await fetch(`/items/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch item for editing');
            }
            const item = await response.json();
            itemId = item.id;
            document.getElementById('item-name').value = item.name;
            document.getElementById('item-price').value = item.price;
            document.getElementById('item-qty').value = item.qty;
            form.querySelector('button[type="submit"]').textContent = "Update";
            cancelEditButton.style.display = "block";
            editMode = true;
        } catch (error) {
            console.error('Error editing item:', error);
            // Anda bisa menambahkan kode di sini untuk menangani kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
        }
    };

    window.deleteItem = async (id) => {
        try {
            await fetch(`/items/${id}`, {
                method: "DELETE"
            });
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
            // Anda bisa menambahkan kode di sini untuk menangani kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
        }
    }

    const addItem = async (name, price, qty) => {
        try {
            await fetch('/items', {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    name, price, qty
                })
            });
            fetchItems();
        } catch (error) {
            console.error('Error adding item:', error);
            // Anda bisa menambahkan kode di sini untuk menangani kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
        }
    }

    const updateItem = async (id, name, price, qty) => {
        try {
            await fetch(`items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name, price, qty
                })
            });
            fetchItems();
        } catch (error) {
            console.error('Error updating item:', error);
            // Anda bisa menambahkan kode di sini untuk menangani kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = itemId;
        const name = document.getElementById('item-name').value.trim();
        const price = Number(document.getElementById('item-price').value);
        const qty = Number(document.getElementById('item-qty').value);
        if(editMode) {
            updateItem(id, name, price, qty);
        } else {
            addItem(name,price,qty);
            console.log(name);
            console.log(price);
            console.log(qty);
        }
        form.reset();
        form.querySelector('button[type="submit"]').textContent = "Tambah";
        cancelEditButton.style.display = 'none';
        editMode = false;
    });

    cancelEditButton.addEventListener('click', () => {
        form.reset();
        form.querySelector('button[type="submit"]').textContent = 'Save Item';
        cancelEditButton.style.display = 'block';
        editMode = false;
    });

    fetchItems();
});
