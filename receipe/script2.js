const input = document.querySelector("input");
const button = document.querySelector("button");
const recipeContainer = document.querySelector(".results");

const generateRecipe = (
  img,
  title,calories,cuisineType,dishType,searchItem
) => `<div style="width: 300px;" class='bg-white rounded-3xl shadow-xl overflow-hidden'>
    <div class='max-w-md mx-auto'>
        <div style="height:200px;
            background-image:url('${img}');
            background-size:cover;
            background-position:center" class="bg-red-100 w-full h-2/3">
        </div>
        <div class='p-3 sm:p-3'>
            <p class='font-bold text-gray-800 text-[18px] leading-7 mb-1'>${title}</p>
           
            <p class='text-[#7C7C80] font-[15px] mt-1'>Details :</p>
            <p class='text-[#7C7C80] font-[15px] mt-1'>Calories : ${calories}</p>
            
            <p class='text-[#7C7C80] font-[15px] mt-1'>Cuisine Type : ${cuisineType}</p>

            <p class='text-[#7C7C80] font-[15px] mt-1'>Dish Type : ${dishType}</p>
            <a target='_blank' href='https://api.edamam.com/api/recipes/v2?type=public&q=${searchItem}&app_id=40f7481c&app_key=7c8681c17a1b596a6afb521017bbaf7f'
                class='block mt-2 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
                View more details
            </a>

        </div>
    </div>
</div>`;

const searchRecipe = async () => {
  try {
    const searchItem = input.value;
    const endPoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchItem}&app_id=40f7481c&app_key=7c8681c17a1b596a6afb521017bbaf7f`;
    const result = await fetch(endPoint);
    const data = await result.json();
    const recipes = data.hits;
    recipeContainer.innerHTML = "";
    recipes.forEach((obj) => {
      const { image,label,calories,cuisineType,dishType } = obj.recipe;
      console.log(recipes)
      recipeContainer.innerHTML += generateRecipe(image,label,calories,cuisineType,dishType,searchItem);
    });
  } catch (err) {
    console.log(err);
  }
};
button.addEventListener("click", searchRecipe);
