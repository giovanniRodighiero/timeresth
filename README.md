# TIMERESTH web app

![alt text][logo]

[logo]: https://github.com/giovanniRodighiero/timeresth/blob/master/assets/timerest-logo.png "Logo Timerest"

Timeresth is a workout management app that allows the user to create, edit and execute HIIT style workouts based on time instead of repetitions.

Create the workout that best suits your needs: different working out and resting times per exercise per round are possibile thanks to the flexible workout model and intuitive UI.

## dev

In order to update the Database interface:

```
npx supabase login
npx supabase projects list
npx supabase gen types typescript --project-id <project_id> > src/types/database.ts
```

Or by hand.
