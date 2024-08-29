

const loadPhones = async(phone) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`);
    const phones = await res.json();
    displayPhones(phones.data);
   
}

const displayPhones = (phones) => {

    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = '';

    for(const phone of phones){
    //    console.log(phone.phone_name);
    const newPhone = document.createElement('div');
    newPhone.classList = `card bg-gray-900 shadow-xl`
    newPhone.innerHTML = `
            
            <figure class="px-10 pt-10">
              <img
                src=${phone.image}
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
          
    `

    phoneContainer.appendChild(newPhone);

    }

}

console.log("Hi bro")

loadPhones()

const searchPhone = () => {
  const searchBox = document.getElementById("input-phone");
  const phoneName = searchBox.value;
  // console.log(phoneName);
  loadPhones(phoneName);
}