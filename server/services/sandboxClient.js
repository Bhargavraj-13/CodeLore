import axios from "axios";

const sandboxClient = axios.create({
  baseURL: process.env.SANDBOX_API_URL,
  timeout: 15000,
});

export async function executeInSandbox(payload) {
  try {
    const res = await sandboxClient.post("/execute", payload, {
      headers: {
        Authorization: `Bearer ${process.env.SANDBOX_SHARED_SECRET}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Sandbox call failed:", err.message);

    // normalize error so frontend doesn't break
    return {
      status: "RUNTIME_ERROR",
      passed: 0,
      total: 0,
      testCaseResults: [],
      error: "Sandbox service unavailable",
    };
  }
}