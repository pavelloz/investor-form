const Validate = {
  dob: (value) => {
    const isValid =
      /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(value);

    return isValid
      ? false
      : "Date of birth should be in MM/DD/YYYY format. Example: 06/24/1987";
  },
  phone: (value) => {
    const isValid = value.length > 6;

    return isValid
      ? false
      : "Phone should be at least 6 digits long. Example: 4151238860";
  },
  zipCode: (value) => {
    const isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);

    return isValid
      ? false
      : "Zip code should be in U.S. format. Examples: 90210, 34101-9999";
  },
};

export default Validate;
