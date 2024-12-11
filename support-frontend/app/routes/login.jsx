import { useActionData, Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    // Include admin: true to indicate an admin-level login request
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/signin/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, admin: true }),
        credentials: "include", // Ensure cookies are included in the request
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return json({ error: data.error || "Login failed" }, { status: 400 });
    }

    const data = await response.json();

    // Optionally, you can verify if the response includes is_admin
    if (!data.is_admin) {
      return json(
        { error: "You do not have admin privileges." },
        { status: 403 }
      );
    }

    const cookieValue = `access_token=${data.access_token}; Path=/; Secure; SameSite=None`;

    return redirect("/", {
      headers: {
        "Set-Cookie": cookieValue,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return json({ error: "An error occurred during login." }, { status: 500 });
  }
};

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <Form method="post">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          {actionData?.error && (
            <p className="text-red-500 text-xs italic mb-4">
              {actionData.error}
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
