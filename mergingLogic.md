
Sudo code for column sweep with the move UP:

```
For (i= 0 to 3)	{


	If (sum of column == 0)
		{	return;	}
	Else if ( value(0,0) == val(1,0) )
			{	val(0,0) = val(0,0) + val(1,0)	}
			if ( val(2,0) == val(3,0) )
				{ 	val(1,0) = val(2,0) + val(3,0);
					val(2,0) = 0;
					val(3,0) = 0; 	}
		else {	val(1,0) = val(2,0);
					val(2,0) = val(3,0);
					val(3,0) = 0;		return; }
		Else if ( value(1,0) == val(2,0) )
				if ( val(0,0) == 0)
				{ 	val(0,0) = val(1,0) + val(2,0); }
				else {	val(1,0) = val(2,0) + val(3,0);
					val(2,0) = val(3,0);
					val(3,0) = 0; 		return; }
		Else if ( value(2,0) == val(3,0) )
				if ( val(0,0) == 0 && val(1,0) == 0)
						{ 	val(0,0) = val(2,0) + val(3,0); }
				else if ( val(0,0) == 0 && val(1,0) !=0) 
					{	val(0,0) = val(1,0);
						val(1,0) = val(2,0) + val(3,0);	
						val(2,0) = 0;
						val(3,0) = 0;	 }
			else if(val(0,0) != 0 && val(1,0) ==0)
					{	val(1,0) = val(2,0) + val(3,0);
						val(2,0) = 0
						val(3,0) = 0;	 }
			else if ( val(0,0)!=0 && val(1,0) != 0)	
					{	val(2,0) = val(2,0) + val(3,0);
						val(3,0) = 0; 		return;}

```

