const app = Vue.createApp({
  data() {
    return{
      step: 0,
      name: '',
      email: '',
      phone: null,
    }
  },
  methods: {
    checked(event){
      if (event.currentTarget.checked){
        event.currentTarget.closest('.add-on').classList.add("check-selected")
      } else{
        event.currentTarget.closest('.add-on').classList.remove("check-selected")
      }
    }
  }
});