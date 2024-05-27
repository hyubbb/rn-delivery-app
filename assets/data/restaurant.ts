export const getDishById = (id: number, name: string) => {
  const meals = restaurants[id].food.flatMap((category) => category.meals);
  return meals.find((meal) => meal.name == name);
};
export const restaurants = [
  {
    name: "한식당 A",
    rating: "4.8",
    ratings: "(1200+)",
    img: require("../images/res1.webp"),
    distance: "1.93 km",
    delivery: "15-25분",
    tags: ["Korean", "BBQ", "Rice", "Soup", "Vegetarian"],
    about: "신선한 재료로 만든 전통 한식을 제공하는 맛집입니다.",
    food: [
      {
        category: "set Menu",
        meals: [
          {
            id: 1,
            name: "불고기 세트",
            price: 20000,
            info: "불고기, 밥, 반찬, 그리고 소프트 드링크 포함",
            img: require("../images/menu1.webp"),
          },
          {
            id: 2,
            name: "비빔밥 세트",
            price: 18000,
            info: "비빔밥, 반찬, 소프트 드링크 포함",
            img: require("../images/menu2.webp"),
          },
        ],
      },
      {
        category: "BBQ",
        meals: [
          {
            id: 3,
            name: "삼겹살",
            price: 25000,
            info: "삼겹살과 다양한 반찬",
            img: require("../images/menu3.webp"),
          },
          {
            id: 4,
            name: "갈비",
            price: 30000,
            info: "갈비와 다양한 반찬",
            img: require("../images/menu4.webp"),
          },
        ],
      },
      {
        category: "Noodles",
        meals: [
          {
            id: 1,
            name: "비빔냉면",
            price: 12000,
            info: "매콤한 비빔냉면과 반찬",
            img: require("../images/menu5.webp"),
          },
          {
            id: 2,
            name: "잔치국수",
            price: 10000,
            info: "따뜻한 국물의 잔치국수",
            img: require("../images/menu6.webp"),
          },
        ],
      },
      {
        category: "Rice",
        meals: [
          {
            id: 1,
            name: "비빔밥",
            price: 12000,
            info: "비빔밥과 반찬",
            img: require("../images/menu13.webp"),
          },
          {
            id: 2,
            name: "김밥",
            price: 8000,
            info: "다양한 재료가 들어간 김밥",
            img: require("../images/menu14.webp"),
          },
        ],
      },
      {
        category: "Soups",
        meals: [
          {
            id: 3,
            name: "미역국",
            price: 9000,
            info: "미역국과 밥, 반찬",
            img: require("../images/menu15.webp"),
          },
        ],
      },
      {
        category: "Chicken",
        meals: [
          {
            id: 1,
            name: "양념치킨",
            price: 15000,
            info: "양념치킨과 감자튀김",
            img: require("../images/menu9.webp"),
          },
          {
            id: 2,
            name: "후라이드 치킨",
            price: 14000,
            info: "바삭한 후라이드 치킨과 감자튀김",
            img: require("../images/menu10.webp"),
          },
        ],
      },
    ],
  },
  {
    name: "한식당 B",
    rating: "4.7",
    ratings: "(800+)",
    img: require("../images/res2.webp"),
    distance: "0.8 km",
    delivery: "10-20분",
    tags: ["Korean", "Noodles", "Vegetarian", "Vegan Friendly"],
    about: "다양한 한국 전통 면 요리를 즐길 수 있는 곳입니다.",
    food: [
      {
        category: "Noodles",
        meals: [
          {
            id: 1,
            name: "비빔냉면",
            price: 12000,
            info: "매콤한 비빔냉면과 반찬",
            img: require("../images/menu5.webp"),
          },
          {
            id: 2,
            name: "잔치국수",
            price: 10000,
            info: "따뜻한 국물의 잔치국수",
            img: require("../images/menu6.webp"),
          },
        ],
      },
      {
        category: "Soups",
        meals: [
          {
            id: 3,
            name: "된장찌개",
            price: 8000,
            info: "된장찌개와 밥, 반찬",
            img: require("../images/menu7.webp"),
          },
          {
            id: 4,
            name: "김치찌개",
            price: 9000,
            info: "김치찌개와 밥, 반찬",
            img: require("../images/menu8.webp"),
          },
        ],
      },
      {
        category: "Chicken",
        meals: [
          {
            id: 1,
            name: "양념치킨",
            price: 15000,
            info: "양념치킨과 감자튀김",
            img: require("../images/menu9.webp"),
          },
          {
            id: 2,
            name: "후라이드 치킨",
            price: 14000,
            info: "바삭한 후라이드 치킨과 감자튀김",
            img: require("../images/menu10.webp"),
          },
        ],
      },
    ],
  },
  {
    name: "한식당 C",
    rating: "4.6",
    ratings: "(900+)",
    img: require("../images/res3.webp"),
    distance: "3.2 km",
    delivery: "20-30분",
    tags: ["Korean", "Chicken", "Soup", "Vegetarian"],
    about: "맛있는 치킨 요리와 전통 찌개를 제공하는 한식당입니다.",
    food: [
      {
        category: "Chicken",
        meals: [
          {
            id: 1,
            name: "양념치킨",
            price: 15000,
            info: "양념치킨과 감자튀김",
            img: require("../images/menu9.webp"),
          },
          {
            id: 2,
            name: "후라이드 치킨",
            price: 14000,
            info: "바삭한 후라이드 치킨과 감자튀김",
            img: require("../images/menu10.webp"),
          },
        ],
      },
      {
        category: "Soups",
        meals: [
          {
            id: 3,
            name: "순두부찌개",
            price: 10000,
            info: "순두부찌개와 밥, 반찬",
            img: require("../images/menu11.webp"),
          },
          {
            id: 4,
            name: "육개장",
            price: 11000,
            info: "매콤한 육개장과 밥, 반찬",
            img: require("../images/menu12.webp"),
          },
        ],
      },
    ],
  },
  {
    name: "한식당 D",
    rating: "4.5",
    ratings: "(600+)",
    img: require("../images/res4.webp"),
    distance: "2.4 km",
    delivery: "15-20분",
    tags: ["Korean", "Rice", "Soup", "Vegan Friendly"],
    about: "다양한 밥 요리와 찌개를 즐길 수 있는 한식당입니다.",
    food: [
      {
        category: "Rice",
        meals: [
          {
            id: 1,
            name: "비빔밥",
            price: 12000,
            info: "비빔밥과 반찬",
            img: require("../images/menu13.webp"),
          },
          {
            id: 2,
            name: "김밥",
            price: 8000,
            info: "다양한 재료가 들어간 김밥",
            img: require("../images/menu14.webp"),
          },
        ],
      },
      {
        category: "Soups",
        meals: [
          {
            id: 3,
            name: "미역국",
            price: 9000,
            info: "미역국과 밥, 반찬",
            img: require("../images/menu15.webp"),
          },
        ],
      },
    ],
  },
  // {
  //   name: "한식당 E",
  //   rating: "4.9",
  //   ratings: "(1500+)",
  //   img: require("../images/res5.webp"),
  //   distance: "2.7 km",
  //   delivery: "20-30분",
  //   tags: ["Korean", "BBQ", "Vegan Friendly"],
  //   about: "신선한 재료로 만든 다양한 한식 BBQ 요리를 제공합니다.",
  //   food: [
  //     {
  //       category: "BBQ",
  //       meals: [
  //         {
  //           id: 1,
  //           name: "돼지갈비",
  //           price: 28000,
  //           info: "양념 돼지갈비와 반찬",
  //           img: null,
  //         },
  //         {
  //           id: 2,
  //           name: "소고기 갈비",
  //           price: 35000,
  //           info: "양념 소고기 갈비와 반찬",
  //           img: null,
  //         },
  //       ],
  //     },
  //     {
  //       category: "Soups",
  //       meals: [
  //         {
  //           id: 3,
  //           name: "감자탕",
  //           price: 12000,
  //           info: "감자탕과 밥, 반찬",
  //           img: null,
  //         },
  //         // {
  //         //   id: 4,
  //         //   name: "된장국",
  //         //   price: 8000,
  //         //   info: "된장국과 밥, 반찬",
  //         //   img: null,
  //         // },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "한식당 F",
  //   rating: "4.4",
  //   ratings: "(700+)",
  //   img: require("../images/res6.webp"),
  //   distance: "1.7 km",
  //   delivery: "15-25분",
  //   tags: ["Korean", "Rice", "Soup", "Vegan Friendly"],
  //   about: "다양한 한식 밥 요리를 제공하는 맛집입니다.",
  //   food: [
  //     {
  //       category: "Rice",
  //       meals: [
  //         {
  //           id: 1,
  //           name: "돌솥비빔밥",
  //           price: 14000,
  //           info: "돌솥비빔밥과 반찬",
  //           img: null,
  //         },
  //         {
  //           id: 2,
  //           name: "제육덮밥",
  //           price: 12000,
  //           info: "매콤한 제육덮밥과 반찬",
  //           img: null,
  //         },
  //       ],
  //     },
  //     {
  //       category: "Soups",
  //       meals: [
  //         {
  //           id: 3,
  //           name: "사골국",
  //           price: 10000,
  //           info: "사골국과 밥, 반찬",
  //           img: null,
  //         },
  //         {
  //           id: 4,
  //           name: "콩나물국",
  //           price: 8000,
  //           info: "콩나물국과 밥, 반찬",
  //           img: null,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "한식당 G",
  //   rating: "4.3",
  //   ratings: "(500+)",
  //   img: require("../images/res7.webp"),
  //   distance: "2.1 km",
  //   delivery: "20-30분",
  //   tags: ["Korean", "Noodles", "Soup", "Vegetarian"],
  //   about: "다양한 한식 국수 요리를 제공하는 곳입니다.",
  //   food: [
  //     {
  //       category: "Noodles",
  //       meals: [
  //         {
  //           id: 1,
  //           name: "잔치국수",
  //           price: 10000,
  //           info: "따뜻한 국물의 잔치국수",
  //           img: null,
  //         },
  //         {
  //           id: 2,
  //           name: "칼국수",
  //           price: 11000,
  //           info: "신선한 칼국수와 반찬",
  //           img: null,
  //         },
  //       ],
  //     },
  //     {
  //       category: "Soups",
  //       meals: [
  //         {
  //           id: 3,
  //           name: "북엇국",
  //           price: 9000,
  //           info: "북엇국과 밥, 반찬",
  //           img: null,
  //         },
  //         {
  //           id: 4,
  //           name: "매생이국",
  //           price: 8000,
  //           info: "매생이국과 밥, 반찬",
  //           img: null,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "한식당 H",
  //   rating: "4.2",
  //   ratings: "(400+)",
  //   img: require("../images/res8.webp"),
  //   distance: "1.3 km",
  //   delivery: "10-20분",
  //   tags: ["Korean", "BBQ", "Soup", "Vegetarian"],
  //   about: "다양한 한식 BBQ와 찌개를 제공하는 맛집입니다.",
  //   food: [
  //     {
  //       category: "BBQ",
  //       meals: [
  //         {
  //           id: 1,
  //           name: "돼지불백",
  //           price: 20000,
  //           info: "돼지불백과 반찬",
  //           img: null,
  //         },
  //         {
  //           id: 2,
  //           name: "닭갈비",
  //           price: 22000,
  //           info: "매콤한 닭갈비와 반찬",
  //           img: null,
  //         },
  //       ],
  //     },
  //     {
  //       category: "Soups",
  //       meals: [
  //         {
  //           id: 3,
  //           name: "김치국",
  //           price: 7000,
  //           info: "김치국과 밥, 반찬",
  //           img: null,
  //         },
  //         {
  //           id: 4,
  //           name: "된장국",
  //           price: 8000,
  //           info: "된장국과 밥, 반찬",
  //           img: null,
  //         },
  //       ],
  //     },
  // ],
  // },
];
