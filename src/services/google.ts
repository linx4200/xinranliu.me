import { google } from 'googleapis';

export async function getAvailability() {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // 定义查询范围, 未来 30 天
    const now = new Date();
    const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: end.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    });

    // busy 数组包含了所有已有预约的时间段
    const busyTimes = response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID!]?.busy || [];

    return { busy: busyTimes };
  } catch (error) {
    console.error('Google Calendar API Error:', error);
    return { error: 'Failed to fetch calendar' };
  }
}