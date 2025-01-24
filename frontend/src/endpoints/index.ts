import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import {
  TOPICS_API_V1,
  TOPIC_BY_ID_API_V1,
  TOPIC_COMMENTS_API_V1,
  TOPIC_VOTES_API_V1,
  TOPIC_VOTE_API_V1,
  TOPIC_REPLIES_API_V1,
  CATEGORY_API_V1,
  USER_API_V1,
  USER_AUTH_API_V1,
  CATEGORIES_API_V1,
  USER_PROFILE_API_V1,
} from '@root/constants';
import { engagementActions } from '@/data/userEngagement';
import type { TSignUpData, TLoginData } from '@/interfaces';

const getTopics = async (date: string, userId: string, category: string) => {
  try {
    let queryString: string = '';
    let headers = {};

    if (date) {
      queryString += `date=${date}`;
    }

    if (category) {
      queryString += `&category=${category}`;
    }

    if (userId) {
      headers = new Headers({
        'X-UserId': userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
    }

    const fetchedTopics: Response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${TOPICS_API_V1}?${queryString}`,
      { method: 'GET', headers },
    );

    if (!fetchedTopics.ok) {
      return {};
    }
    return await fetchedTopics.json();
  } catch (error) {
    return {};
  }
};

const getTopicsById = async (id: string, userId: string) => {
  try {
    let headers = {};

    if (userId) {
      headers = new Headers({
        'X-UserId': userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
    }
    const fetchedTopic: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${TOPIC_BY_ID_API_V1}/${id}`, {
      method: 'GET',
      headers,
    });
    const res = await fetchedTopic.json();
    return res;
  } catch (error) {
    return {};
  }
};

const getComments = async (id: string, userId: string) => {
  try {
    const fetchedComments: Response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${TOPIC_COMMENTS_API_V1}/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({ userId: userId }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const res = await fetchedComments.json();
    return res;
  } catch (error) {
    return {};
  }
};

const sendComment = async (comment: string, userId: string, topicId: string, token: string = '') => {
  try {
    const fetchedComments: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${TOPIC_COMMENTS_API_V1}`, {
      method: 'POST',
      body: JSON.stringify({ comment: comment, userId: userId, topicId: topicId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const res = await fetchedComments.json();
    return res;
  } catch (error) {
    return {};
  }
};

const sendReply = async (comment: string, userId: string, topicId: string, parentId: string, token: string = '') => {
  try {
    const fetchedComments: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${TOPIC_REPLIES_API_V1}`, {
      method: 'POST',
      body: JSON.stringify({
        content: comment,
        userId: userId,
        topicId: topicId,
        parentId: parentId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const res = await fetchedComments.json();
    return res;
  } catch (error) {
    return {};
  }
};

const getVotes = async (id: string, userId: string) => {
  try {
    const fetchedVotes: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${TOPIC_VOTES_API_V1}`, {
      method: 'POST',
      body: JSON.stringify({ userId: userId, id: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await fetchedVotes.json();
    return res;
  } catch (error) {
    return {};
  }
};

const vote = async (type: string, userId?: string, topicId?: string, token?: string) => {
  if (!userId || !topicId || !token) return;

  try {
    const voteType = type === engagementActions.UPVOTE ? 'up' : 'down';
    const fetchedVotes: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${TOPIC_VOTE_API_V1}`, {
      method: 'POST',
      body: JSON.stringify({ type: voteType, userId: userId, topicId: topicId }),
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    const res = await fetchedVotes.json();
    return res;
  } catch (error) {
    return {};
  }
};

async function createProviderUser(user: User | AdapterUser) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${USER_API_V1}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.name,
        name: user.name,
        email: user.email,
        phone: '',
        userProfilePic: user.image,
        singupType: 'provider',
        password: user.token,
      }),
    });

    // if the response is not ok, set the error message from the server
    if (!response.ok) {
      return false;
    }

    const serverResponse = await response.json();

    return serverResponse.message;
  } catch (error) {
    return false;
  }
}

async function validateUserRegistration(user: User | AdapterUser) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${USER_AUTH_API_V1}/validateUserRegistration`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        user: JSON.stringify(user),
      },
    });
    const userValidation = await response.json();

    return userValidation;
  } catch (error) {
    return false;
  }
}

async function activateAccount(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${USER_API_V1}/activateAccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activationKey: token,
      }),
    });

    const activationResponse = await response.json();

    return { status: response.status, activationResponse };
  } catch (error) {
    return;
  }
}

async function createUser({ username, email, password }: TSignUpData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${USER_API_V1}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        name: '',
        email,
        phone: '',
        userProfilePic: '',
        password,
        singupType: 'email',
      }),
    });

    // if the response is not ok, set the error message from the server
    const serverResponse = await response.json();

    return { ok: response.ok, message: serverResponse.message };
  } catch (error) {
    return {};
  }
}

async function loginUser({ email, password }: TLoginData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${USER_API_V1}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const serverResponse = await response.json();

    return {
      ok: response.ok,
      message: serverResponse.message,
      user: {
        email: serverResponse.email,
        id: serverResponse.id,
        image: serverResponse.image,
        name: serverResponse.name,
        token: serverResponse.token,
      },
    };
  } catch (error) {
    return {};
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${CATEGORIES_API_V1}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const categories = await response.json();

    return categories;
  } catch (error) {
    return [];
  }
}

async function getCategoryById(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${CATEGORY_API_V1}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const category = await response.json();

    return category;
  } catch (error) {
    return {};
  }
}

async function getUserProfile(id: string, token: string) {
  try {
    if (!id) {
      return {};
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${USER_PROFILE_API_V1}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: token },
    });

    const userProfile = await response.json();

    return userProfile;
  } catch (error) {
    return {};
  }
}

async function updateUserProfile(id: string, token: string, data: any) {
  try {
    if (!id) {
      return {};
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${USER_PROFILE_API_V1}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify(data),
    });

    const userProfile = await response.json();

    return userProfile;
  } catch (error) {
    return {};
  }
}

async function deleteUserProfile(id: string, token: string) {
  try {
    if (!id) {
      return {};
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${USER_PROFILE_API_V1}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', authorization: token },
    });

    const userProfile = await response.json();

    return userProfile;
  } catch (error) {
    return {};
  }
}

export {
  getTopics,
  getTopicsById,
  getComments,
  sendComment,
  loginUser,
  getVotes,
  vote,
  sendReply,
  createProviderUser,
  validateUserRegistration,
  activateAccount,
  createUser,
  getCategories,
  getCategoryById,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
