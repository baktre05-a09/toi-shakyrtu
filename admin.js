const SUPABASE_URL = "https://skgdudkljsgwgxfcvoee.supabase.co";

const SUPABASE_KEY = "sb_publishable_ttqLlH2B2TDwX5-A_RJWSg_tpO4UgQh";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


async function loadGuests() {

    const { data, error } = await supabaseClient
        .from("guests")
        .select("name, guests_count, attendance, created_at")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(error);

        document.getElementById("guestTable").innerHTML = `
            <tr>
                <td colspan="4">
                    Қонақтарды жүктеу кезінде қате шықты.
                </td>
            </tr>
        `;

        return;
    }


    const table = document.getElementById("guestTable");

    table.innerHTML = "";


    let coming = 0;
    let notComing = 0;


    data.forEach(guest => {

        if (
            guest.attendance === "Келемін" ||
            guest.attendance === "Иә" ||
            guest.attendance === "Келеді"
        ) {
            coming++;
        }

        else {
            notComing++;
        }


        const row = document.createElement("tr");


        const date = new Date(
            guest.created_at
        ).toLocaleString("kk-KZ");


        row.innerHTML = `
            <td>${guest.name}</td>
            <td>${guest.guests_count}</td>
            <td>${guest.attendance}</td>
            <td>${date}</td>
        `;


        table.appendChild(row);

    });


    document.getElementById("total").textContent =
        data.length;

    document.getElementById("coming").textContent =
        coming;

    document.getElementById("notComing").textContent =
        notComing;

}


loadGuests();