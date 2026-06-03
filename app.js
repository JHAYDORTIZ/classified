const SUPABASE_URL = "https://kgnwvtxtpvzecszbtccd.supabase.co";
const SUPABASE_KEY = "sb_publishable_xrZxEdNMvwm1CE3IhXDnWg_NlMubbLk";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* LOGIN */
async function login() {
  const email = document.getElementById("email").value;

  const { error } = await client.auth.signInWithOtp({
    email
  });

  if (error) {
    alert("ERROR EN EL LOGIN");
    console.log(error);
  } else {
    alert("REVISA TU EMAIL PARA ENTRAR");
  }
}

/* VER SI YA ESTÁ LOGUEADO */
async function checkUser() {
  const { data } = await client.auth.getSession();

  console.log("SESSION:", data.session);

  if (data.session) {
    document.getElementById("gate").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
  }
}
  const { data } = await client.auth.getUser();

  if (data.user) {
    document.getElementById("gate").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
  }
}

checkUser();