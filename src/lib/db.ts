import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'users.json');

export const getUsers = (): any[] => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    // Safety check: if the file is empty, return an empty array
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Database read error:", error);
    return [];
  }
};

export const saveUser = (newUser: any) => {
  try {
    const users = getUsers();
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Database write error:", error);
  }
};