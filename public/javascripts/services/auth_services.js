let authServices = {
  auth: async function (name, password) {
    const data = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: name, password: password })
    }
    const response = await fetch('/user/auth', data)
    return await response.json()
  },
}

export default authServices