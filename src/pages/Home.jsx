import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import ContactTable from "../components/ContactTable";
import ShowModal from "../components/ShowModal";
import EditModal from "../components/EditModal";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-title">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <h2 className="m-0">All Contacts</h2>

                    <SearchBar />

                    <div>
                      <Link to="/add" className="btn btn-success">
                        <i className="fa fa-plus-circle"></i> Add New
                      </Link>
                    </div>
                  </div>
                </div>

                <Filter />

                <div className="card-body">
                  <ContactTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ShowModal />
      <EditModal />
    </>
  );
}
