import { createClient } from "@supabase/supabase-js";

import { Database } from "../types/database.interface";

declare const ENV: {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
};

export default createClient<Database>(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
