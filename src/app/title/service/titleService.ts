import { Title } from "../types/titleTypes";

const baseUrl = `${process.env.NEXT_PUBLIC_API}/title`;

export async function getTitles() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error();
    }
    const data: Title[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTitle(id: string) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function addTitle(description: string) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function updatedTitle(id: string, description: string) {
  try {
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, description: description }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
