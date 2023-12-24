import React, { useContext } from "react";
import { UserContext } from "../contextprovider/UserContext";
import CircularLoading from "../reusable/CircularLoading";

const DietAndTips = () => {
  const { LoginStatus } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = LoginStatus;
  const dietPlan = [
    {
      meal: "Snack",
      food: [
        "Yogurt with mixed fruits",
        "Hummus with baby carrots",
        "Banana and cocoa yogurt popsicles",
        "Natural peanut butter with celery sticks",
        "Assorted nuts",
      ],
    },
    {
      meal: "Breakfast",
      food: [
        "Avocado toast",
        "Banana and oatmeal smoothie",
        "Veggie omelet with toast",
        "Kale and sweet potato scramble",
        "Blueberry pancake stack",
      ],
    },
    {
      meal: "Lunch",
      food: [
        "Stir-fried veggies with quinoa",
        "Coleslaw with apples",
        "Chicken sandwich with tomato and avocado",
        "Sweet potato and black bean quesadillas",
        "Grilled chicken garden salad",
      ],
    },
    {
      meal: "Dinner",
      food: [
        "Salmon roast with zucchini and sweet potato",
        "Grilled steak with Argentinean salsa",
        "Veggie roast with hummus",
        "Chicken and whole-wheat pasta",
        "Herb-baked fish with lemon",
      ],
    },
  ];

  const tips = [
    "Stay hydrated by drinking 6-8 cups of water daily.",
    "Avoid high-saturated fat foods like pastries, processed meats, and fried snacks.",
    "Choose foods with polyunsaturated and monounsaturated fats over high-saturated fat foods. Opt for oils, spreads, nut butters, and avocados instead of butter and cream.",
    "Minimize added salt in your diet and during cooking.",
    "Limit consumption of added sugars found in sweets, sugary drinks, and energy drinks.",
    "Keep indulgent foods to a minimum; they're not part of a regular healthy diet.",
    "Stay active with at least 30 minutes of moderate exercise, like walking, daily.",
    "Diversify your diet with foods from all five groups, focusing on colorful vegetables, legumes, fruits, whole grains, lean proteins, and low-fat dairy.",
    "Ensure adequate calcium intake to maintain bone health.",
    "Include fiber-rich foods for better digestion.",
    "Opt for foods rich in omega-3 fatty acids for heart health.",
    "Regularly consume foods rich in vitamin B12, as absorption decreases with age.",
    "Stay socially active and share meals with others when possible.",
  ];

  return (
    <>
      {loggedIn ? (
        <div className="container">
          <h2 className="text-center my-4 text-primary">Food Menu for You</h2>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th>Meal</th>
                <th>Food</th>
              </tr>
            </thead>
            <tbody>
              {dietPlan.map((item, index) => (
                <>
                  {item.food.map((foodItem, foodIndex) => (
                    <tr key={`${index}.${foodIndex}`}>
                      {foodIndex === 0 && (
                        <td rowSpan={item.food.length}>{item.meal}</td>
                      )}
                      <td>{foodItem}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
          <div className="alert alert-info my-4" role="alert">
            Maintain a balanced diet with diverse foods, stay hydrated, and
            limit saturated fats, salt, and sugars. Opt for healthier fats when
            possible. Keep indulgences minimal and aim for at least 30 minutes
            of moderate exercise daily, like walking. Stay healthy!
          </div>
          <div className="card my-4">
            <div className="card-header">
              <h5 className="text-center text-primary">
                Some Tips To Stay Healthy
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {tips.map((tip, index) => (
                  <li key={index} className="list-group-item">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <CircularLoading />
      )}
    </>
  );
};

export default DietAndTips;
