import { getInstances } from "../../services/instances";
import { getUser } from "../../services/auth";

export async function getInstancesData() {
  try {
    const data = await getInstances();
    return { data };
  } catch {
    return {};
  }
}

export async function getUserData() {
  try {
    const data = await getUser();
    return { data };
  } catch {
    return {};
  }
}
