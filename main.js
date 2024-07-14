const app = Vue.createApp({
  data() {
    return{
      step: 0,
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

const checkboxes = document.querySelectorAll('.add-on input[type="checkbox"]');

function checkboxChecked(e){
  console.log('checked',)

}

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('click', function(e) {
    console.log('checked')
    if (checkbox.checked){
      checkbox.closest(".add-on").classList.add("check-selected")
    } else{
      checkbox.closest(".add-on").classList.remove("check-selected")
    }
  })
})