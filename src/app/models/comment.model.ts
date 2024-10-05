
export interface Comment {
    _id: string;
    image: string; // The ID of the associated image
    text: string; // The text of the comment
    user: string; // The ID of the user who made the comment
    replies?: Reply[]; // Optional, for storing replies
    createdAt: string; // Timestamp of when the comment was created
    __v?: number; // Version key
  }

  export interface Reply {
    _id?: string; // Optional, for reply ID
    text: string; // The text of the reply
    createdAt?: string; // Optional, for timestamp
  }