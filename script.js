const SUPABASE_URL = "https://skgdudkljsgwgxfcvoee.supabase.co";
const SUPABASE_KEY = "sb_publishable_ttqLlH2B2TDwX5-A_RJWSg_tpO4UgQh";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


const form = document.getElementById("guestForm");
const message = document.getElementById("message");


form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("guestName").value;
    const guestsCount = document.getElementById("guestsCount").value;
    const attendance = document.getElementById("attendance").value;

    const { error } = await supabaseClient
        .from("guests")
        .insert([
            {
                name: name,
                guests_count: Number(guestsCount),
                attendance: attendance
            }
        ]);

    if (error) {
        console.error(error);
        message.textContent = "Қате шықты. Қайта көріңіз.";
        return;
    }

    message.textContent =
        `Рақмет, ${name}! Жауабыңыз сақталды ❤️`;

    form.reset();

});
const weddingDate = new Date("2026-10-25T18:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.querySelector(".countdown").innerHTML =
            "Тойымыз басталды! ❤️";
        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();

setInterval(updateCountdown, 1000);