"use client";

export default function CustomersPage() {
  return (
    <div>
      <h1>Customers Page</h1>
      <br />
      <p>
        Elenco dei clienti in Gestione Dovranno essere filtrati in base
        all'utente che effettua l'accesso.
        <br />
        <br />
        L'utente adiministrator potrà inserire i clienti, inserire un bottone per l'aggiunta di un nuovo cliente, sulla riga del cliente aggiungere i tasti di modifica, eliminazione e disattivazione. 
        <br />
        Premendo su modifica e aggiunta aprire una tab customer detail con un form per l'inserimento e/o la modifica. La modifica e visualizzazione completa si può aprire anche con il doppio click.
        <br />
        <br />
        Layout a griglia per la visualizzazione delle info di base, esportabile in excel e con la possibilità di spostare le colonne a piacimento. 
        <br />
        Tasto di ricerca generale no filtro su colonne
      </p>
    </div>
  );
}
