import app from "./app";

const env = process.env.ENVIRONMENT ?? "development";

app
  .listen({ host: "0.0.0.0", port: 3000 })
  .then(() => {
    console.log(`✅ Server is running`);
    console.log(`Environment: ${env}`);
  })
  .catch((error: Error) => {
    console.log(`🫡 Server is expiriencing L`);
    console.log(`Reason: ${error}`);
    process.exit(1);
  });
