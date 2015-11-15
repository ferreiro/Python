% include ('header.tpl', title='Hola')
	
	% if len(notes) > 0 or searchTemplate == True:
	<div class="Profile-Header-wrap">
		<div class="Profile-Header">
			<h1 class="Profile-Header-Name">
				% if searchTemplate == True:
					Notes containing
					<strong>{{Keyword}}</strong>
					<a href="/">Close</a>
				% else:
					my
					<strong>notes</strong>
				%end
			</h1>
		</div>
	</div>
	% end

	<div class="containter-wrapper">
		<div class="containter">

			% print searchTemplate
			% if searchTemplate == True and len(notes) == 0:
				<style type="text/css">
					.Zero-NotesWrap:before {
						background-image:url(images/empty2.jpg);
					}
				</style>
				<div class="Zero-NotesWrap">
					<div class="Zero-Notes">
						<h1 class="Zero-Notes-Title">{{user['Name']}}, We haven't found any note that contains your keyword.</h1>
					</div>
				</div>

			%end

			% if searchTemplate == False and len(notes) == 0:
			<div class="Zero-NotesWrap">
				<div class="Zero-Notes">
					<h1 class="Zero-Notes-Title">Hi {{user['Name']}}!,<br /> You haven't written any note yet.</h1>
					<a class="Zero-Notes-Create" href="/create">Write your first Note now!</a>
				</div>
			</div>
			%end 
			
			% if len(notes) > 0:
				% for note in notes:

					<div class="Note-wrapper">
						<div class="Note" id="{{note['NoteID']}}">

							<div class="Note-Options">
								<span class="Note-Options-link">
									<div class="icon-cog"></div>
								</span>
								<ul class="Note-Options-dropDown">
									<li>
										<a href="/{{user['Username']}}/{{note['Permalink']}}/edit">
											Edit Note
										</a>
									</li>
									<li class="Note-Options-delete">
										<a href="/delete/{{note['NoteID']}}">
											Delete
										</a>
									</li>
								</ul>
							</div>
							
							<div class="Note-line-color" style="border-color:#{{note['ColorHEX']}};"></div>

							<div class="Note-link">
								<a href="/{{user['Username']}}/{{note['Permalink']}}"></a>
							</div>

							<h1 class="Note-Title">
								{{note['Title'][:60]}}	
							</h1>
							<p class="Note-Content">
								<%
									data = note['Content'];
									data = data[:120] + '...'
									print data
								%>
								{{data}} 
							</p>

							<div class="Note-Metada-Wrapper">
								<div class="Note-Metada">


									% if (note['Published']):
										<span class="Note-Private">
											<b>Published </b>
											<% 
												date = note['CreatedAt']
												date = date.split(' ');
												date = date[0]
											%>
											{{date}}
										</span>
									% else:
										<span class="Note-Private">
											<b>Draft (?)</b>
										</span>
									% end


									% if (note['Private']):
										<span class="Note-Private">
											<b>Private</b>
										</span>
									% else:
										<span class="Note-Private">
											<b>Public (?)</b>
										</span>
									% end

									<span>-</span>

								</div>
							</div>

						</div>
					</div>
			% end

		</div>
	</div>


% include ('footer.tpl')
