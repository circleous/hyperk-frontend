export async function getInstances() {
  const res = await fetch(`/api/v1/instances`, {
    credentials: "include",
  });
  return await res.json();
}

export async function getInstanceDetail(id) {
  const res = await fetch(`/api/v1/instances/${id}`, {
    credentials: "include",
  });
  return await res.json();
}

export async function updateState(id, state) {
  const res = await fetch(`/api/v1/instances/${id}/state`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      state: state,
    }),
  });
  return await res.json();
}

export async function createInstance({
  name,
  os,
  vcpu,
  size,
  ram,
  ram_unit,
  root_password,
  hostname,
}) {
  const res = await fetch(`/api/v1/instances/create`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      os,
      vcpu,
      size,
      ram,
      ram_unit,
      root_password,
      hostname,
    }),
  });
  return await res.json();
}
