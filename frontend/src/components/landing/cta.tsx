export function Cta() {
  return (
    <section id="assessment" className="section--cta">
      <div className="container">
        <div className="cta">
          <div className="cta-form-box">
            <h2 className="secondary-heading">
              Get your first Level assessment for free!
            </h2>
            <p className="cta-text">
              Take the first step toward fluency with a free level assessment.
              No commitment — just sign up and get started!
            </p>

            {/* Registration is not implemented yet: the submit button is disabled. */}
            <form className="cta-form">
              <div>
                <label htmlFor="full-name" className="form-label">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  placeholder="Shahadat Hossain"
                  autoComplete="name"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="where" className="form-label">
                  Where did you know about us?
                </label>
                <select name="where" id="where" className="form-input">
                  <option value="">Please choose one option:</option>
                  <option value="friends">Friends and family</option>
                  <option value="youtube">Youtube</option>
                  <option value="facebook">Facebook</option>
                  <option value="podcast">Podcast</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-btn-box">
                <button
                  type="submit"
                  className="form-btn"
                  disabled
                  title="Registration is not available yet"
                >
                  Register now
                </button>
              </div>
            </form>
          </div>
          <div
            className="cta-img-box"
            role="img"
            aria-label="Woman studying English"
          />
        </div>
      </div>
    </section>
  );
}
