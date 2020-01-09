import api from './apiService';

/**
 * Default options to send to server.
 */
const defaultOptions = {};

const getProviderByID = async providerID => {
  // @todo Combine defaultOptions with providerID to form options.
  const options = {};

  // @todo fix this if this is not working.
  const data = await api
    .getData(options)
    .then(responseJson => responseJson.data)
    .catch(error => {
      console.error(error);
    });
  return data;
};

const ProdiverAPIService = {
  getProviderByID,
  // In future, add other functions to e.g. getAllProviders, updateProvider, deleteProvider
};

export default ProdiverAPIService;
