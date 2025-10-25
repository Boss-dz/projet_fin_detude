// import { Client } from "@gradio/client";

// export async function predictDisease(imageUrl) {
//   // 1️⃣ Fetch your image
//   const response = await fetch(imageUrl);
//   const exampleImage = await response.blob();

//   // 2️⃣ Connect to your Space (replace this with your Space name)
//   const client = await Client.connect("Seroy/Disease-detector");

//   // 3️⃣ Call the /predict API endpoint
//   const result = await client.predict("/predict", {
//     image: exampleImage,
//   });

//   // 4️⃣ Return prediction
//   return result.data;
// }

import { Client } from "@gradio/client";

export async function predictDisease(file) {
  try {
    console.log("Connecting to Space...");
    const client = await Client.connect("Seroy/Disease-detector");
    console.log("Connected ✅");

    console.log("Sending image...");
    const result = await client.predict("/predict", {
      image: file,
    });

    console.log("Prediction result:", result);
    return result.data;
  } catch (err) {
    console.error("🔥 Error while predicting:", err);
    throw err;
  }
}
