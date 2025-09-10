# Free Mouse App Setup Guide

This guide explains how to install **PM2**, set up your project, and run the Free Mouse application so that you can access it anytime.

---

## 1. Install Node.js
Make sure you have **Node.js** installed on your computer.  
Download it from: [https://nodejs.org](https://nodejs.org)

Verify installation:
```bash
node -v
npm -v
```

---

## 2. Install PM2
PM2 is a process manager that keeps your app running in the background.

```bash
npm install -g pm2
```

Verify installation:
```bash
pm2 -v
```

---

## 3. Navigate to Your Project
Go to your project folder:
```bash
cd path/to/your/project
```

---

## 4. Start Your Application with PM2
Run your app using:
```bash
pm2 start npm --name free-mouse -- start
```

This will:
- Start your app
- Keep it running in the background
- Name the process **free-mouse**

---

## 5. Make PM2 Auto-Start on Boot
To ensure the app runs even after a system restart:
```bash
pm2 startup
pm2 save
```

---

## 6. Check Running Processes
List running processes:
```bash
pm2 list
```

Check logs:
```bash
pm2 logs free-mouse
```

---

## 7. Stop or Restart the App
Stop the app:
```bash
pm2 stop free-mouse
```

Restart the app:
```bash
pm2 restart free-mouse
```

Delete the app from PM2:
```bash
pm2 delete free-mouse
```

---

## 🎉 Done!
Now your **Free Mouse App** will always be live on your PC, and you can stop or restart it anytime using PM2 commands.

