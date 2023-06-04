export async function oauthGoogleCallback(code) {
  const res = await fetch(
    `/api/v1/auth/google/callback?` +
      new URLSearchParams({
        code: code,
      }),
    {
      credentials: "include",
    }
  );
  if (res.status !== 200) throw new Error("Unauthorized");
  return await res.json();
}

export async function getUser() {
  const res = await fetch(`/api/v1/auth`, {
    credentials: "include",
  });
  if (res.status !== 200) throw new Error("Unauthorized");
  return await res.json();
}
