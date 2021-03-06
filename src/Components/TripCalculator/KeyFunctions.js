import {KEY_NUMBERS} from "../keyValues";

export const mealCost = (totalMiles, drivers) => {
  return ((Math.round(totalMiles / 300)) * KEY_NUMBERS.AVG_MEAL_PRICE) * drivers;
}

export const hoursBasedOnMiles = (totalMiles) => {
  return Math.round(totalMiles/75);
}

export const mealsBasedOnMiles = (totalMiles) => {
  return Math.round(totalMiles / 300);
  // the assumption here is that every 300 miles we will stop for a meal. This value was determined by considering the okc metro run (to prevent meals on that trip)
  // and how many miles are in a day of driving which we agreed on limiting to 600 miles a day.
}
export const drivingDaysByMiles = (totalMiles) => {
  return Math.ceil(totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT)
}

export const hotelTotalCostByMiles = (totalMiles) => {
  return KEY_NUMBERS.HOTEL_COST * (Math.ceil(totalMiles / KEY_NUMBERS.DAILY_MILE_LIMIT) - 1)
}

export const vanFuelExpenseByMiles = (totalMiles, gasPrice) => {
  return (totalMiles / KEY_NUMBERS.VAN_MPG) * parseFloat(gasPrice);
}

export const labor = (totalMiles, drivers) => {
  return ((KEY_NUMBERS.HOURLY_FEE * totalMiles )) * drivers;

}

export const vanTotal = (labor, gas, hotel, meals) => {
return labor + gas + hotel + meals;
}



export const rental26Fees = (totalMiles, rentalPaddingDay, drivingDays) => {
  // state is adding an extra day due to a yet to be found bug so I removed a day in the calculations to compensate until the bug is fixed
  let drivingPaddingDays = (drivingDays + rentalPaddingDay-1)%7
  let dailyFee = (KEY_NUMBERS.ENTERPRISE_26_DAILY_FEE * drivingPaddingDays);
  let weeks = (KEY_NUMBERS.ENTERPRISE_26_WEEKLY_FEE * Math.floor((drivingDays + rentalPaddingDay-1)/7));
  let roadside = (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (drivingDays + rentalPaddingDay));
  let miles = (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))
  return parseInt(dailyFee + weeks + roadside + miles);
}


export const truck26Fuel = (totalMiles, diesel) => {
  return parseInt((totalMiles / KEY_NUMBERS.TRUCK_26_MPG) * parseFloat(diesel))
}

export const rental16Fees = (totalMiles, rentalPaddingDay, drivingDays) => {
  // state is adding an extra day due to a yet to be found bug so I removed a day in the calculations to compensate until the bug is fixed
  let drivingPaddingDays = (drivingDays + rentalPaddingDay-1)%7
  let dailyFee = (KEY_NUMBERS.ENTERPRISE_16_DAILY_FEE * drivingPaddingDays);
  let weeks = (KEY_NUMBERS.ENTERPRISE_16_WEEKLY_FEE * Math.floor((drivingDays + rentalPaddingDay-1)/7));
  let roadside = (KEY_NUMBERS.ENTERPRISE_ROADSIDE_DAILY * (drivingDays + rentalPaddingDay));
  let miles = (KEY_NUMBERS.ENTERPRISE_MILEAGE_CHARGE * (totalMiles + KEY_NUMBERS.ROUND_TRIP_WAREHOUSE_ENTERPRISE))
  return parseInt(dailyFee + weeks + roadside + miles);
}

export const truck16Fuel = (totalMiles, diesel) => {
  return parseInt((totalMiles / KEY_NUMBERS.TRUCK_16_MPG) * parseFloat(diesel))
}


export const truck26Total = (rentalFees, meals, labor, diesel, hotel ) => {
  return parseInt(rentalFees) + parseInt(meals) + parseInt(labor) + parseInt(diesel) + parseInt(hotel);
}

export const truck16Total = (rentalFees, meals, labor, diesel, hotel ) => {
  return rentalFees + meals + labor + diesel + hotel;
}

// export const checkedLocations = (checkedId, x) => {
//     var locations = x.concat([])
//   // we're getting somewhere. The function runs at render but is alos runs each time it's clicked. How do we get it to not run at render?
//     if (locations === undefined) {
//       locations.push(checkedId)
//     }
//     else if (!locations.includes(checkedId)) {
//     locations.push(checkedId)

//    } else {
//     const filteredLocations = locations.filter((locationId) => {
//       if (locationId !== checkedId){
//         return true
//       }
//     })

//     return filteredLocations;
//   }
//   console.log(checkedId);
//   console.log(locations)
// }