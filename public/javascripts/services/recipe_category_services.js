let recipeCategoriesServices = {
    getAll: async function () {
        const response = await fetch('/recipe-category')
        return await response.json()
    },
    create: async function (name) {
        const data = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name: name })
        }
        const response = await fetch('/recipe-category', data)
        return await response.json()
    },
    update: async function (id, name) {
        const data = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id: id, name: name, })
        }
        const response = await fetch(`/recipe-category/${id}`, data);
        return await response.json()
    },
    delete: async function (id) {
        const data = {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
        }

        const response = await fetch(`/recipe-category/${id}`, data);
        return await response.json()
    },

}

export default recipeCategoriesServices