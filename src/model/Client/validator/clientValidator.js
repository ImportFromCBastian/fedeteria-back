//TODO: refactor birthday validator

export const clientValidator = client => {
  const containsSpecialChar = (password, charset) => {
    for (let i = 0; i < charset.length; i++) {
      if (password.includes(charset[i])) {
        return true
      }
    }
    return false
  }
  let message = {}
  let errors = 0

  client.notification = client.notification === 'true' ? 'si' : 'no'

  const charset = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=']

  const capitalLetters = /[A-Z]/g

  //DNI validation
  if (client.dni === '') {
    message = { ...message, emptyDni: 'El DNI no puede estar vacio' }
  } else {
    if (isNaN(parseInt(client.dni))) {
      message = { ...message, notNumberDni: 'El dni debe ser un numero' }
    }
  }
  //Name validation
  if (client.name === '') {
    message = { ...message, name: 'El nombre no puede estar vacio' }
  }

  //Last name validation
  if (client.lastName === '') {
    message = { ...message, lastName: 'El apellido no puede estar vacio' }
  }
  //Mail validation
  if (client.email === '') {
    message = { ...message, email: 'El mail no puede estar vacio' }
  }
  //Password validation
  if (client.password === '') {
    message = { ...message, passwordEmpty: 'La contraseña no puede estar vacia' }
  } else {
    if (client.password.length < 6) {
      message = { ...message, passwordLength: 'La contraseña debe tener al menos 6 caracteres' }
    }

    if (!containsSpecialChar(client.password, charset)) {
      message = { ...message, passwordSpecialChar: 'La contraseña debe tener al menos un caracter especial' }
    }

    if (!client.password.match(capitalLetters)) {
      message = { ...message, passwordCapitalLetter: 'La contraseña debe tener al menos una letra mayuscula' }
    }
  }
  //Birthdate validation
  const clientBirthdate = {
    year: parseInt(client.birthdate.split('-')[0]),
    month: parseInt(client.birthdate.split('-')[1]),
    day: parseInt(client.birthdate.split('-')[2]),
  }
  const currentYear = new Date()
  const difference = currentYear.getFullYear() - clientBirthdate.year

  if (difference < 18) {
    message = { ...message, birthday: 'Debes ser mayor de edad' }
  } else {
    if (difference === 18) {
      const currentMonth = currentYear.getMonth() + 1
      const monthDifference = clientBirthdate.month - currentMonth

      if (monthDifference < 0) {
        message = { ...message, birthday: 'Debes ser mayor de edad' }
      } else {
        if (monthDifference === 0) {
          const currentDay = currentYear.getDate()
          const dayDifference = clientBirthdate.day - currentDay
          if (dayDifference > 0) {
            message = { ...message, birthday: 'Debes ser mayor de edad' }
          }
        }
      }
    }
  }
  return [client, message]
}
