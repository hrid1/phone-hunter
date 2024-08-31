const loadPhones = async (phone, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  const phones = await res.json();
  displayPhones(phones.data, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  // showAll btn hide and show
  const showallBtn = document.getElementById("showAll-btn-div");

  // console.log(isShowAll);

  if (phones.length > 6 && !isShowAll) {
    showallBtn.classList.remove("hidden");
  } else {
    showallBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }

  for (const phone of phones) {
    //    console.log(phone.phone_name);
    const newPhone = document.createElement("div");
    newPhone.classList = `card bg-gray-900 shadow-xl`;
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
                <button onclick="handleViewDetails('${phone.slug}')" class="btn btn-primary">Buy Now</button>
              </div>
            </div>
          
    `;

    phoneContainer.appendChild(newPhone);
  }

  lodingSpiner(false); //for hiding spiner
};

// loadPhones()

const searchPhone = (isShowAll) => {
  lodingSpiner(true); // for showing spiner

  const searchBox = document.getElementById("input-phone");
  const phoneName = searchBox.value;

  let searchName;
  phoneName ? (searchName = phoneName) : (searchName = "iphone");
  loadPhones(searchName, isShowAll);
};

// loading spiner
function lodingSpiner(isActive) {
  const loadingDiv = document.getElementById("spiner-div");

  if (isActive) {
    loadingDiv.classList.remove("hidden");
  } else {
    loadingDiv.classList.add("hidden");
  }
}

// View Details

const handleViewDetails = async (id) => {
  console.log("i got it", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const phone = await res.json();
  // console.log(phone.data);
  showPhoneDetails(phone.data);
};

const showPhoneDetails = (phone) => {
  const { name, releaseDate, brand, mainFeatures, image } = phone;
  console.log(phone);
  my_modal.showModal();

  const modalContainer = document.getElementById("modal-info");
  modalContainer.innerText = " ";

  const modal = document.createElement("div");
  modal.innerHTML = `

    <div class="my-4">
            <img
                src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg"
                alt="Shoes"
                class="rounded-xl mx-auto" />
            <div class="mx-2 my-4 text-gray-200">
              <h3 class="text-xl font-bold">${name}</h3>
              <p class="mb-2">It is a long established fact that a reader will be distracted.</p>
          
           
            <p><span class="font-semibold">Display Size: </span> ${
              mainFeatures?.displaySize
            }</p>
            <p><span class="font-semibold">Chipset: </span> ${
              mainFeatures?.chipSet
            }</p>
            <p><span class="font-semibold">Memory: </span> ${
              mainFeatures?.storage
            } </p>
            <p><span class="font-semibold">Sencors: ${
              mainFeatures?.sensors.length
            } </span>

            ${mainFeatures?.sensors
              .map((sensor) => `<span>${sensor}</span>`)
              .join(", ")}
      
            </p>

             <p class="mt-2"><span class="font-semibold">Release Date: </span> ${
               releaseDate ? releaseDate : "Not Available"
             }</p>
            

            <div class="modal-action">
            <div>
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>

  `;
  modalContainer.appendChild(modal);
};

const handleShowAll = () => {
  console.log("HI");
  searchPhone(true);
};


// run here
searchPhone();
