app.component('add-ons', {
  template:
  /* html */
  `
  <section class="step">
  <div class="description">
    <h1 class="title">Pick add-ons</h1>
    <p class="p-description">Add-ons help enhance your gaming experience.</p>
  </div>
  <section class="add-on-plans flex">
    <label for="online" class="add-on flex">
      <div class="add-on-group flex">
        <div class="add-on-check">
          <input type="checkbox" @click="checked" name="add-on" id="online">
        </div>
        <div class="add-on-description">
          <h2 class="plan">Online service</h2>
          <p class="add-on-description">Access to multiplayer games</p>
        </div>
      </div>
      <div class="add-on-price">+$1/mo</div>
    </label>
    <label for="storage" class="add-on">
      <div class="add-on-group">
        <div class="add-on-check"><input type="checkbox" @click="checked" name="add-on" id="storage"></div>
        <div class="add-on-description">
          <h2 class="plan">Larger storage</h2>
          <p class="add-on-description">Extra 1TB of cloud save</p>
        </div>
      </div>
      <div class="add-on-price">+$2/mo</div>
    </label>
    <label for="custom" class="add-on">
      <div class="add-on-group">
        <div class="add-on-check"><input type="checkbox" @click="checked" name="add-on" id="custom"></div>
        <div class="add-on-description">
          <h2 class="plan">Customizable Profile</h2>
          <p class="add-on-description">Custom theme on your profile</p>
        </div>
      </div>
      <div class="add-on-price">+$2/mo</div>
    </label>
  </section>
</section>
  `,
  data() {
    return{
      
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
})