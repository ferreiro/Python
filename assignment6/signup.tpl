

% if editUser == True:
<h1>Edit your user information</h1>
%else:
<h1>Sign up our awesome webpage</h1>
%end

% if editUser == True:
<form action="/profile/edit" method="POST"> 
%else:
<form action="/register" method="POST"> 
%end  
	<p> 
		<label for="namesignup" class="uname" data-icon="u">Your name</label>

		% if editUser == True:
			<input id="namesignup" name="namesignup" required="required" type="text" placeholder="mysuperusername690" value="{{user['Name']}}" />
		%else:
			<input id="namesignup" name="namesignup" required="required" type="text" placeholder="mysuperusername690" />
		%end
	</p>
	<p> 
		<label for="surnamesignup" data-icon="u">Your surname</label>
		% if editUser == True:
			<input id="surnamesignup" name="surnamesignup" required="required" type="text" placeholder="mysuperusername690" value="{{user['Surname']}}" />
		%else:
			<input id="surnamesignup" name="surnamesignup" required="required" type="text" placeholder="mysuperusername690" />
		%end 
	</p>
	<p> 
		<label for="usernamesignup" class="username" data-icon="u">Your username</label>

		% if editUser == True:
			<p>Username can't be changed</p>
		%else:
			<input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" />
		%end  
	</p>
	<p> 
		<label for="birthdaysignup" class="ubirthday" data-icon="u">Your birthday</label>
		
		% if editUser == True:
			<input id="birthdaysignup" name="birthdaysignup" required="required" type="date" value="{{user['Birthday']}}" />
		%else:
			<input id="birthdaysignup" name="birthdaysignup" required="required" type="date"/>
		%end  
	</p>
	<p> 
		<label for="citysignup" class="ucity" data-icon="u">Your city</label>
		
		% if editUser == True:
			<input id="citysignup" name="citysignup" required="required" type="name" value="{{user['City']}}"/>
		%else:
			<input id="citysignup" name="citysignup" required="required" type="name"/>
		%end  
	</p>
	<p> 
		<label for="emailsignup" class="youmail" data-icon="e" > Your email</label>

		% if editUser == True:
			<p>Email can't be changed (for now).</p>
		%else:
			<input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.com"/> 
		%end  
	</p>
	<p> 
		<label for="passwordsignup" class="youpasswd" data-icon="p">Your password </label> 

		% if editUser == True:
			<p>Passwords can't be changed (for now).</p>
		%else:
			<input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO"/>
		%end 
	</p>
	<p class="signin button"> 
		% if editUser == True:
			<input type="submit" value="Update data"/> 
		%else:
			<input type="submit" value="Sign up"/> 
		%end 
	</p>
	<p class="change_link">  
		Already a member ?
		<a href="/login" class="to_register"> Go and log in </a>
	</p>
</form>