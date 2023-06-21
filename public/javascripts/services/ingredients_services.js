let ingrediensServices = {
  getAll: async function () {
    const response = await fetch('/ingredients')
    return await response.json()
  },
  create: async function (name, situation) {
    const data = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name: name })
    }
    const response = await fetch('/ingredients', data)
    return await response.json()
  },
  update: async function (id, name) {
    const data = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id: id, name: name, })
    }
    const response = await fetch(`/ingredients/${id}`, data);
    return await response.json()
  },
  delete: async function (id) {
    const data = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    }

    const response = await fetch(`/ingredients/${id}`, data);
    return await response.json()
  },

}

export default ingrediensServices