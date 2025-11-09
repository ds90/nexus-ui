export  enum UserRole {
    /// Super amministratore - accesso completo a tutte le organizzazioni.
    /// Può vedere e modificare qualsiasi cosa nel sistema.
    /// Può fare completamente tutto per tutti (Verra utilizzato solo da utenti Nexus)
    SuperAdmin = 0,

    /// Amministratore - controllo totale sull'organizzazione.
    /// comprese le tabelle che si possono personalizzare, ma sempre legate all'organizzazione.
    /// Potrà essere richesta la completa eliminazione, anche dell'organizzazione, ma l'azione sarà eseguita manualmente da un utente supradmin
    Administrator = 1,

    /// Manager/Project Manager - gestisce progetti e team.
    Manager = 2,

    /// Membro standard con accesso base.
    /// Può vedere i progetti a lui assegnati, creare i progetti/task
    /// Eliminare i sui task e progetti
    /// visualizzata clienti che ha assegnati e potrà modificare il suo utente e la sua password, no eliminazione soft o hard
    Member = 3,

    /// Cliente esterno - visualizza solo i propri progetti (sola lettura).
    Customer = 4,
    /// <summary>
    /// Utente per utilizzo API da altro gestionale, può eseguire tutte le CRUD ma non può fare eliminazione.
    /// eliminazione soft di tutto tranne che di organizzazione e del suo utente e utenti Administrator
    /// </summary>
    api = 5,
}