const SUPABASE_URL = "https://kgnwvtxtpvzecszbtccd.supabase.co";
const SUPABASE_KEY = "sb_publishable_xrZxEdNMvwm1CE3IhXDnWg_NlMubbLk";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* =========================
   LOGIN
========================= */
window.login = async function () {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Introduce un email");
    return;
  }

  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://jhaydortiz.github.io/classified/"
    }
  });

  if (error) {
    console.error(error);
    alert(error.message);
  } else {
    alert("Revisa tu email para entrar");
  }
};

/* =========================
   MOSTRAR / OCULTAR UI
========================= */
function showApp() {
  document.getElementById("gate").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

/* =========================
   CHECK SESIÓN INICIAL
========================= */
async function checkUser() {
  const { data } = await client.auth.getSession();

  console.log("SESSION:", data.session);

  if (data.session) {
    showApp();
  }
}

checkUser();

/* =========================
   ESCUCHAR LOGIN/LOGOUT
========================= */
client.auth.onAuthStateChange((event, session) => {
  console.log("AUTH EVENT:", event);

  if (session) {
    showApp();
  }
});