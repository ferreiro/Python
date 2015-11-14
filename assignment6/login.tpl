% include ('header.tpl', title='Hola')
    
    <div class="login">
        <div class="login-form">

            <h1>
                Welcome to SuperNotes!
            </h1>
            <h2>
                The easiest way to save all your ideas, notes and projects in one place.
            </h2>

            <span><b>Connect to your account</b></span>
            <form action="/login" method="post">
                <div>
                    <label for="mail">
                        E-mail:
                    </label>
                    <input name="email" type="email" id="mail" placeholder="Your email" />
                </div>
                <div>
                    <label for="password">
                        Password:
                    </label>
                    <input name="password" type="password" />
                </div>
                
                <div class="button">
                    <button type="submit">Send your message</button>
                </div>

                <p>
                    Don't you have an ccount? <a href="/register">Register!</a>
                </p>
            </form>
        </div>
    </div> 
    


  <script src="js/scripts.js"></script>
</body>
</html>