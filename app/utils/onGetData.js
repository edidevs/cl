export const onGetData = async setState => {
  await fetch(
    'https://ulo.life/api/timeslots?provider_id=7c8ea264-2cd3-4e5b-8f40-46a1a6fda174&sort_by=created_at&order=asc&app_version=1.10.0',
  )
    .then(response => response.json())
    .then(responseJson => {
      setState({
        data: responseJson,
        success: true,
      });
    })
    .catch(error => {
      console.error(error);
    });
};
