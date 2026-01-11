# Inter-Hostel Sports GC Management System

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  **Database Setup**:
    - Go to your Supabase project's SQL Editor.
    - Copy the contents of `supabase_schema.sql` and run it.
    - This will create the necessary tables (Teams, Sports, Matches, Standings).

4.  **Run the App**:
    ```bash
    npm run dev
    ```

## Features

- **Public Dashboard**: View GC Standings and Upcoming Matches.
- **Live Match Center**: Real-time scores and stream embedding.
- **Schedule**: Filterable match list.
- **Admin Panel**: Manage matches and broadcast live scores.

## Scoring Logic

- **Athletics**: 1st (20), 2nd (12), 3rd (8), 4th (4)
- **Tug of War**: 1st (5), 2nd (3), 3rd (2)
- **Team Sports**: 1st (10), 2nd (6), 3rd (4)
- **Tie-Breaker**: Points -> Gold -> Silver -> Bronze.
