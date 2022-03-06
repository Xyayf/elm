export default {
  namespaced: true,
  state: {
    latitude: 31.22967,
    longitude: 121.4762,
    geohash: ''

  },
  mutations: {
    setLocation (state, data) {
      state.latitude = data.latitude
      state.longitude = data.longitude
      state.geohash = {
        latitude: state.latitude,
        longitude: state.longitude
      }
      console.log(data.latitude, data.longitude)
    }
  }
}
